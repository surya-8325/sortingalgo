export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(mainArray, startIdx, middleIdx, animations);
  mergeSortHelper(mainArray, middleIdx + 1, endIdx, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, animations) {
  let left = [];
  let right = [];
  const n1 = middleIdx - startIdx + 1,
    n2 = endIdx - middleIdx;
  for (let p = 0; p < n1; p++) left.push(mainArray[p + startIdx]);
  for (let q = 0; q < n2; q++) right.push(mainArray[q + middleIdx + 1]);
  let k = startIdx;
  let i = 0;
  let j = 0;
  while (i < n1 && j < n2) {
    // These are the values that we're comparing; we push them once
    // to change their color and again to revert their color
    animations.push([i + startIdx, j + middleIdx + 1]);
    animations.push([i + startIdx, j + middleIdx + 1]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    if (left[i] <= right[j]) {
      animations.push([k, left[i]]);
      mainArray[k++] = left[i++];
    } else {
      animations.push([k, right[j]]);
      mainArray[k++] = right[j++];
    }
  }
  while (i < n1) {
    animations.push([i + startIdx, i + startIdx]);
    animations.push([i + startIdx, i + startIdx]);
    animations.push([k, left[i]]);
    mainArray[k++] = left[i++];
  }
  while (j < n2) {
    animations.push([j + middleIdx + 1, j + middleIdx + 1]);
    animations.push([j + middleIdx + 1, j + middleIdx + 1]);
    animations.push([k, right[j]]);
    mainArray[k++] = right[j++];
  }
}
