
// ULID for every subject
// const ULID = require('ulid');
// ULID.ulid();
// console.log(ULID);

let curRating;
let curID;

curID = 99999;
const base_url = '/static/experiments/current/nikola_hitl_2nd/stimuli/'

// Add your own javacript functions here. 
function toggle_instruction(page){
    $('.instruction_page').addClass('hidden'); // hide everythithing
    $(`#${page}`).removeClass('hidden') // and show the target page again
    document.getElementById(page).scrollIntoView();
};
window.toggle_instruction = toggle_instruction;

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    var uuidField = document.getElementById("uuid");
    uuidField.value = uuid;

    console.log(uuid);
    return uuid;
  }

function get_current_ID() {
    const IDTextBox = document.getElementById('uuid');
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

// -----------------
// Experiment
// Define a function to compare two images and ask the user to choose
// The compareImages function returns a promise that resolves to either -1 
// if the user thinks the right image is greater, 0 if the user thinks both images are equal, 
// or 1 if the user thinks the left image is greater.
async function compareImages(img1, img2, pairs) {
    // Hide all other images while the comparison is being made
    const images = Array.from(document.querySelectorAll('#experiment-image-container img'));
    images.forEach(img => {
        if (img !== img1 && img !== img2) {
        img.classList.add('hidden');
        }
    });

    return new Promise(resolve => {
        // Create a new div to show the two images
        const comparisonDiv = document.createElement('div');
        comparisonDiv.appendChild(img1);
        comparisonDiv.appendChild(img2);
        document.body.appendChild(comparisonDiv);

        // Attach click handlers to the images to get user input
        
        img1.onclick = () => {
        document.body.removeChild(comparisonDiv);

        // Restore all hidden images
        images.forEach(img => img.classList.remove('hidden'));

        pairs.push([img1.id, img2.id, -1]);
        resolve(-1);
        };
        img2.onclick = () => {
        document.body.removeChild(comparisonDiv);

        // Restore all hidden images
        images.forEach(img => img.classList.remove('hidden'));

        pairs.push([img1.id, img2.id, 1]);
        resolve(1);
        };
    });
}
  
// Define a function to sort an array of images
async function mergeSort(images) {
    const pairs = [];
    var sortedImages = await mergeSortRecursive(images, pairs);
    return { images, pairs, sortedImages};
}
  
async function mergeSortRecursive(images, pairs) {
    // Base case: if there is only one image, return it
    if (images.length <= 1) {
        return images;
    }

    // Recursive case: divide the array into two sub-arrays
    const mid = Math.floor(images.length / 2);
    const left = images.slice(0, mid);
    const right = images.slice(mid);

    // Recursively sort the left and right sub-arrays
    const sortedLeft = await mergeSortRecursive(left, pairs);
    const sortedRight = await mergeSortRecursive(right, pairs);

    // Merge the sorted sub-arrays together
    const merged = [];
    let i = 0, j = 0;
    while (i < sortedLeft.length && j < sortedRight.length) {
        const cmp = await compareImages(sortedLeft[i], sortedRight[j], pairs);
        if (cmp === 1) {
        merged.push(sortedRight[j++]);
        } else {
        merged.push(sortedLeft[i++]);
        }
    }
    while (i < sortedLeft.length) {
        merged.push(sortedLeft[i++]);
    }
    while (j < sortedRight.length) {
        merged.push(sortedRight[j++]);
    }
    return merged;
}

function practiceTest() {
mergeSort(Array.from(document.querySelectorAll('#practice-image-container img')))
    .then(result => {
        console.log('Pairwise comparisons:');
        result.pairs.forEach(pair => {
        console.log(`${pair[0]} vs. ${pair[1]}: ${pair[2]}`);
        });
        // show the button
        document.getElementById("practice_success").style.display = "block";
    });
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var finalResult = [];
// store the sorted list of images from rank 1 to the last
var sortedImgList = [];

function startExperiment() {
    // load the images
    var imageContainer = document.getElementById("experiment-image-container");
    // clear the container
    imageContainer.innerHTML = '';

    var images = [];

    // generate image names dynamically
    for (var i = 1; i <= 100; i++) {
        images.push(base_url + "image_" + i + ".png"); // TODO change the image name
    }

    // current image index
    images = ['ha_367.png', 'ha_84.png', 'ha_207.png', 'ha_2.png', 'ha_212.png', 'ha_399.png', 'ha_428.png', 'ha_172.png', 'ha_50.png', 'ha_1.png', 'ha_407.png', 'ha_201.png', 'ha_215.png', 'ha_5.png', 'ha_348.png', 'ha_54.png', 'ha_412.png', 'ha_174.png', 'ha_404.png', 'ha_202.png', 'ha_43.png', 'ha_377.png', 'ha_149.png', 'ha_106.png', 'ha_24.png', 'ha_476.png', 'ha_310.png', 'ha_489.png', 'ha_477.png', 'ha_311.png', 'ha_19.png', 'ha_107.png', 'ha_139.png', 'ha_111.png', 'ha_33.png', 'ha_27.png', 'ha_475.png', 'ha_32.png', 'ha_110.png', 'ha_128.png', 'ha_262.png', 'ha_288.png', 'ha_303.png', 'ha_301.png', 'ha_315.png', 'ha_329.png', 'ha_249.png', 'ha_314.png', 'ha_466.png', 'ha_116.png', 'ha_11.png', 'ha_443.png', 'ha_292.png', 'ha_244.png', 'ha_442.png', 'ha_132.png', 'ha_130.png', 'ha_124.png', 'ha_454.png', 'ha_497.png', 'ha_252.png', 'ha_284.png', 'ha_482.png', 'ha_131.png', 'ha_119.png', 'ha_451.png', 'ha_243.png', 'ha_257.png', 'ha_256.png', 'ha_16.png', 'ha_450.png', 'ha_122.png', 'ha_320.png', 'ha_334.png', 'ha_491.png', 'ha_268.png', 'ha_296.png', 'ha_241.png', 'ha_233.png', 'ha_384.png', 'ha_186.png', 'ha_151.png', 'ha_145.png', 'ha_184.png', 'ha_59.png', 'ha_9.png', 'ha_393.png', 'ha_344.png', 'ha_422.png', 'ha_185.png', 'ha_152.png', 'ha_368.png', 'ha_235.png', 'ha_221.png', 'ha_382.png', 'ha_396.png', 'ha_341.png', 'ha_380.png', 'ha_381.png', 'ha_342.png']
    

    var shuffledImages = shuffleArray(images);

    for (var i = 0; i < shuffledImages.length; i++) {
        var img = document.createElement("img");
        img.src = base_url + shuffledImages[i];
        img.id = img.src.slice(6).slice(0, -4);
        img.width = 224;
        imageContainer.appendChild(img);
    }


    // Sort the images and display the results
    mergeSort(Array.from(document.querySelectorAll('#experiment-image-container img')))
        .then(result => {
        // Show the sorted images
        const sortedContainer = document.createElement('div');
        sortedImgList = result.sortedImages;

        // Show the accending order of the images
        result.sortedImages.reverse().forEach(img => {
            img.onclick = null;
            img.cursor = 'default';
            
            sortedContainer.appendChild(img);
        });
        document.body.appendChild(sortedContainer);

        // Show the "experiment finished" message
        const finishMessage = document.createElement('h2');
        finishMessage.textContent = 'Experiment finished. Thank you!';
        document.body.appendChild(finishMessage);

        // Display the pairwise comparisons made by the user
        console.log('Pairwise comparisons:');
        result.pairs.forEach(pair => {
            console.log(`${pair[0]} vs. ${pair[1]}: ${pair[2]}`);
            finalResult.push(pair);
        });


    });
}

function get_my_result() {
    result = {
        'ID' : curID,
        'pairwise_rating' : finalResult,
        'sortedlist' : sortedImgList,
    }
    console.log("result is ", result)
    return result;
}

function my_submit() {
    get_current_ID();
    var result = get_my_result()
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