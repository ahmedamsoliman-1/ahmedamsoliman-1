const arr_1 = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 10, 10];
const arr_2 = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 10, 10, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 10, 10];
const arr_3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// log
function log(x) {
    console.log(x);
}

// removeDuplicates
function removeDuplicates(array) {
    let unique = [];
    for (let i = 0; i < array.length; i++) {
        if (unique.indexOf(array[i]) === -1) {
            unique.push(array[i]);
        }
    }
    return unique;
}

function removeDuplicates2(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}

function removeDuplicates3(array) {
    return [...new Set(array)];
}

function removeDuplicates4(array) {
    return Array.from(new Set(array));
}



log(removeDuplicates(arr_2))
log(removeDuplicates2(arr_2))
log(removeDuplicates3(arr_2))
log(removeDuplicates4(arr_2))


// printArray
function printArray(array) {
    for (let i = 0; i < array.length; i++) {
        log(array[i]);
    }
    return array;
}

printArray(arr_2)