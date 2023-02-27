// const btn = document.querySelector('#btn');
// const radioButtons = document.querySelectorAll('input[name="size"]');
// btn.addEventListener("click", () => {
//     let selectedSize;
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             selectedSize = radioButton.value;
//             break;
//         }
//     }
//     // show output
//     output.innerText = selectedSize ? `You selected ${selectedSize}` : `You haven't selected any size`;
// });

// const cl = document.querySelector('#clean');

// cl.addEventListener("click", () => {
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             radioButton.prop('checked', false);
//             break;
//         }
//     }
//     // ('input:radio[name=size]').each(function () { $(this).prop('checked', false); });
// });

let radioButtons;

function checkRadioButtons(radioButtonName) {
    radioButtons = document.querySelectorAll(`input[name=${radioButtonName}]`);
    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    // show output
    const output = document.querySelector('#output')
    output.innerText = selectedSize ? `You selected ${selectedSize}` : `You haven't selected any size`;
};

function clean() {
    $(`input[name="size"]`).prop("checked", false);

    // for (const radioButton of radioButtons) {
    //     if (radioButton.checked) {
    //         radioButton.prop('checked', false);
    //         break;
    //     }
    // }
}