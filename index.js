// Create comparator
class Comparator {
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }
    
    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    equal(a, b) {
        return this.compare(a, b) === 0;
    }

    lessThan(a, b) {
        return this.compare(a, b) < 0;
    }

    greaterThan(a, b) {
        return this.compare(a, b) > 0; 
    }

    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal;
    }

    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal;
    }

    reverse() {
        const compareOriginal = this.compare;
        this.compare = (a, b) => compareOriginal(b, a);
    }
}
// Create main Sort class
class Sort {
    constructor(originalCallbacks) {
        this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
        this.comparator = new Comparator(this.callbacks.coompareFunction);
    }

    static initSortingCallbacks(originalCallbacks) {
        const callbacks = originalCallbacks || {};
        const stubCallback = () => {};

        callbacks.compareCallback = callbacks.compareCallback || undefined;
        callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

        return callbacks;
    }

    sort() {
        throw new Error('sort method must be implemented');
    }
}
// Use method Bubble Sort
class BubbleSort extends Sort {
    sort(originalArray) {
        // Flag that holds info about whether the swap has occur or not
        let swapped = false;
        // Clone original array to prevent its modification
        const array = [...originalArray];

        for (let i = 0; i < array.length; i+= 1) {
            swapped = false;
            // Call visiting callbacks
            this.callbacks.visitingCallback(array[i]);

            for (let j = 0; j < array.length - i; j += 1) {
                // Call visiting callbacks
                this.callbacks.visitingCallback(array[j]);
                // Swap elements if they are in wrong order
                if (this.comparator.lessThan(array[j + 1], array[j])) {
                    [array[j + 1], array[j]] = [array[j], array[j + 1]];
                    // Register the swap
                    swapped = true;
                }
            }
            // If there were no swaps then array is already sorted and there is no need to proceed
            if (!swapped) {
                return array;
            }
        }
        return array;
    }
}
// Use method Selection Sort 
class SelectionSort extends Sort {
    sort(originalArray) {
        // Clone original array to prevent its modification
        const array = [...originalArray];
        for (let i = 0; i < array.length - 1; i += 1) {
            let minIndex = i;
            // Call visiting callback
            this.callbacks.visitingCallback(array[i]);
            // Find minimum element in the rest of array
            for (let j = i + 1; j < array.length; j += 1) {
                // Call visiting callback
                this.callbacks.visitingCallback(array[j]);
                if (this.comparator.lessThan(array[j], array[minIndex])) {
                    minIndex = j;
                }
            }
            // If the minimum element was found, let's swap it with current i-th element
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[j]];
            }
        }
        return array;
    }
}
