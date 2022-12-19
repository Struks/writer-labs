// While this is a simple function, it is a good example of how to
// create a helper function that can be used in multiple places.
// This function is used in the bookController to get the book
const bookHelper = {
    // This function is used to get page animation when change a url page
    navigateAnimation: () => {
        // get element to animate page5 and page6
        const book = document.querySelector('.book');
        const page5 = document.querySelector('.page5');
        const page6 = document.querySelector('.page6');

        if(book.classList.contains('opened-book')) {
            // set page5 diaply none
            page5.style.display = 'none';
            // page5.style.transition = 'display 0.5s ease-in-out';
            // set page6 transform: rotateY(-145deg) and bg color #D7C6B5
            page6.style.transform = 'rotateY(-145deg)';
            page6.style.backgroundColor = '#D7C6B5';
            // Back page 6 to right position and show again page 5
            setTimeout(() => {
                // show page 5 again
                page5.style.display = 'initial';
                // set page 6 transform: rotateY(-35deg), bg color #E3D1BF and display none
                page6.style.display = 'none';
                page6.style.transform = 'rotateY(-35deg)';
                page6.style.backgroundColor = '#E3D1BF';
                
            }, 700);

            // after 1.5s, set page 6 display initial
            setTimeout(() => {
                page6.style.display = 'initial';
            }, 1000);
        }
    },
};

export { bookHelper }