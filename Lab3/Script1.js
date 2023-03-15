function fillRandoms() {
    const nums = document.querySelectorAll('input[type="number"]');
    nums.forEach((num) => {
        num.value = Math.floor(Math.random() * 199) - 99; // випадкове число від -99 до 99
        num.style.backgroundColor = '';
    });
}

function sortStep() {
    clearHighlighting();

    const nums = document.querySelectorAll('input[type="number"]');

    for (let i = 0; i < nums.length - 1; i++) {
        if (parseInt(nums[i].value) > parseInt(nums[i + 1].value)) {
            [nums[i].value, nums[i + 1].value] = [nums[i + 1].value, nums[i].value];

            break;
        }
    }

    sortStepPreview();
}

function sortStepPreview() {
    const nums = document.querySelectorAll('input[type="number"]');

    for (let i = 0; i < nums.length - 1; i++) {
        if (parseInt(nums[i].value) > parseInt(nums[i + 1].value)) {
            nums[i].style.backgroundColor = '#ffd9d9';
            nums[i + 1].style.backgroundColor = '#ffd9d9';
            break;
        }
    }
}

function clearHighlighting() {
    const nums = document.querySelectorAll('input[type="number"]');
    nums.forEach((num) => {
        num.style.backgroundColor = '';
    });
}
