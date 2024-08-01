
const rules = {
    text: {
        minlength: 3,
        maxlength: 500,
        alpha: /^[a-z\s]+$/,
    }
}

const messages = {
    text: {
        required: 'O texto precisa ser preenchido.',
        minlength: 'O texto deve conter no mínimo 3 caracteres.',
        maxlength: 'O texto deve conter no máximo 500 caracteres.',
        alpha: 'O texto só pode conter letras minusculas e sem acentuação.',
    }
}

function validation(complete) {
    const textarea = $('.textarea textarea')

    let invalid = false, message = ''

    textarea.each(function () {
        if ($(this).attr('name') === 'text') {
            let input = $(this).val()
            let regex = rules.text.alpha

            if (input.length > rules.text.maxlength) {
                invalid = true; message = messages.text.maxlength
            }

            if (input.length < rules.text.minlength) {
                invalid = true; message = messages.text.minlength
            }

            if (!regex.test(input)) {
                invalid = true; message = messages.text.alpha
            }

            if (input.length === 0) {
                invalid = true; message = messages.text.required
            }
        }
    })

    if (invalid) {
        $('button.encode').prop('disabled', true)

        let check = textarea.next('label.error')

        if (check.length && check !== message) {
            check.text(message)
        } else {
            textarea.addClass('error').after('<label class="error">' + message + '</label>')
        }

        return true
    }

    else {
        $('button.encode').prop('disabled', false)

        textarea.removeClass('error').next('label.error').remove()

        return false
    }
}