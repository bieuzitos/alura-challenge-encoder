
let timeout

$(document).ready(function () {
    history()
})

$(document).on('click', 'button.printout', function (event) {
    let content = $('.modal-body .modal-subtitle').text()

    let win = window.open('', '', 'width=' + screen.availWidth + ', height=' + screen.availHeight)
    setTimeout(function () {
        if (win) {
            win.document.open()
            win.document.write('<html><head><title>Mensagem decodificada</title></head><body>')
            win.document.write('<p>' + content + '</p>')
            win.document.write('</body></html>')
            win.document.close()

            win.print()
            win.close()
        }
    }, 200)
})

$(document).on('click', 'button.theme', function (event) {
    event.preventDefault()

    $('body').attr('theme-light', function (index, attr) {
        return attr ? null : 'theme-light'
    })
})

$(document).on('click', 'button.encode', function (event) {
    event.preventDefault()

    if (validation()) { return }

    const textarea = $('.textarea textarea')

    createItem(textarea.val())
    textarea.val('').removeClass('error').next('label.error').remove()
    $('.count span').text($('.count span').data('count'))

    $(this).prop('disabled', true)

    history()
})

$(document).on('click', 'button.decode', function (event) {
    event.preventDefault()

    const id = $(this).closest('.menu-box').data('item')
    const item = getItem(id)

    openModalDecode(item)
})

$(document).on('click', 'button.delete', function (event) {
    event.preventDefault()

    const id = $(this).closest('.menu-box').data('item')

    deleteItem(id)

    history()
})

$(document).on('focusin', '.textarea textarea', function () {
    let interval = setInterval(function () {
        validation()
    }, 200)

    $(this).on('focusout', function () {
        clearInterval(interval)
    })
})

$(document).on('input', '.textarea textarea', function () {
    clearTimeout(timeout)

    timeout = setTimeout(function () {
        validation()
    }, 200)

    $('.count span').text($('.count span').data('count') - $(this).val().length)
})

function history() {
    $('.menu-content').empty()

    let items = getAllItems()

    if (items.length > 0) {
        items.reverse().forEach(function (item) {
            $('.menu-content').append(`
                <div class="menu-box" data-item="${item.id}">
                    <div class="box-content">
                        <div class="icon">
                            <i class="fa-solid fa-lock"></i>
                        </div>

                        <div class="attributes">
                            <div class="encode">
                                <span>${item.message}</span>
                            </div>
                            <div class="created">
                                <span>${new Date(item.created_at).toLocaleString('pt-BR')}</span>
                            </div>
                        </div>
                    </div>

                    <div class="menu-action tertiary">
                        <button class="decode">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="delete">
                            <i class="fa-solid fa-ban"></i>
                        </button>
                    </div>
                </div>    
            `)
        })

        return
    }

    $('.menu-content').append(`
        <div class="menu-empty">
            <div class="icon">
                <i class="fa-solid fa-comment-slash"></i>
            </div>
            <div class="text">Nenhuma mensagem encontrada</div>
         </div>
    `)
}

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

$(document).on('click', '.modal button.close', function (event) {
    $('.modal').hide()
})

function openModalDecode(item) {
    let content = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        <i class="fa-solid fa-unlock"></i>
                        <span>Mensagem decodificada</span>
                    </div>
                    <div class="modal-close">
                        <button class="close">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
    
                <div class="modal-body">
                    <div class="modal-subtitle">
                        <span>${item.message}</span>
                    </div>
                </div>
    
                <div class="modal-footer">
                    <div class="modal-action">
                        <div class="modal-button">
                            <button class="printout">
                                <i class="fa-solid fa-print"></i>
                            </button>
                        </div>
                    </div>
    
                    <div class="modal-subtitle">
                        <span>${new Date(item.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            </div>
        </div>`

    $('.modal').html(content).show()
}