
// ULID for every subject
// const ULID = require('ulid');
// ULID.ulid();
// console.log(ULID);

let curRating;
let curID;

curID = 99999;

// Add your own javacript functions here. 
function toggle_instruction(page){
    $('.instruction_page').addClass('hidden'); // hide everythithing
    $(`#${page}`).removeClass('hidden') // and show the target page again
    document.getElementById(page).scrollIntoView();
};
window.toggle_instruction = toggle_instruction;

// radio buttons
// const show_result_btn = document.querySelector('#showResult');
// const radioButtons = document.querySelectorAll('input[name="rating"]');
// show_result_btn.addEventListener("click", () => {
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             curRating = radioButton.value;
//             break;
//         }
//     }
//     curResult.innerText = selectedSize ? `You selected ${curRating}` : `You haven't selected any rating`;
// };

function get_current_rating() {
    radioButtons = document.querySelectorAll('input[name="rating"]');
    
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            curRating = radioButton.value;
            break;
        }
    }
}

function get_current_ID() {
    const IDTextBox = document.getElementById('id');
    if(IDTextBox.value !== null && IDTextBox.value !== '') {
        curID = IDTextBox.value;
    }
    return curID
}
function showID() {
    const idp = document.getElementById('showID')
    idp.innerText = get_current_ID()
}

function show_result() {
	get_current_rating();

    curResult = document.getElementById("curResult");
    curResult.innerText = curRating ? `You selected ${curRating}` : `You haven't selected any rating`;
};

// $("#button1").click(function () {
//     $("#partcipant_id").val("red"); // テキストボックスに値を設定
//   });

function clean_radio_btn() {
	$(`input[name="rating"]`).prop("checked", false);
    document.getElementById("curResult").innerText = ""
};
window.clean_radio_btn = clean_radio_btn;

function my_submit() {
    get_current_rating();
    get_current_ID();
    let result;
    result = {
        'ID' : curID,
        'rating' : curRating
    }
    console.log("result is ", result)
	submit_data(result)
};

function submit_data(data) {
    let date = new Date();

    req = $.ajax({
        type: "POST",
        url: window.url + "data_submission",
        data: {
            'data': JSON.stringify({
                // Data on the user/machine
                'userData': {
                    'size': window._size,
                    'screen': window._screen,
                    'navigator': window._navigator,
                },
                // These three are set in the experiment_wrapper.html 
                'experiment_name': window.experiment_name,
                'experiment_instance': window.experiment_instance,
                'condition': window.condition,

                'worker_id': window.worker_id,

                // PROLIFIC - Automatically skipped if it does not exist.
                'sessionId' : window.SESSION_ID, 
                'HITd' : window.STUDY_ID,

                // MTURK - Automatically skipped if it does not exist.
                'assignmentId': window.assignmentID,
                'HITid': window.HITid,
                // the actual data
                'payload': data,
                'totalTime' : date.getTime() - window._startTime,
            })
        }
    })
    req.done(function (response) {
        console.log("Data submitted succesfully")
        if (window.platform === 'AMT') {
            // we are running an MTURK experiment, finish it as such
            $('#assignmentId').val(window.assignmentID);
            $('#submitButtonAMT').click(); // auto click the mturk submit button.
        } else if (window.platform === 'PROLIFIC') {
            // we are running an Prolofic experiment. 
            window.location.href = window.PROLIFIC_SUBMISSION_URL;
        } else if (window.platform === 'LOCAL') {
            // Seems like we're running without a reward platform so we're basically finished..
        }
    });

    req.fail(function (response) {
        console.log("Something has gone wrong..")
        console.log(response)
        window.resp = response;
    }
    );
}