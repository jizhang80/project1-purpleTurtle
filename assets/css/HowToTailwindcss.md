# How to use tailwindcss development env
* All we need in our html is `output.css` file.
1. goto path `assets/css/`
2. start watcher process `./tailwindcss -i input.css -o output.css --watch`
3. edit HTML element class to use tailwindcss
4. e.g. if you want to edit the font size, ref the link [https://tailwindcss.com/docs/font-size](https://tailwindcss.com/docs/font-size), add `class=text-lg` to the element.
5. if you want to define your own element, like a button, you may edit `input.css` and make sure the watcher prcess running when/after you save the change, the process will compile the change to `output.css`.
e.g. we define a btn-blue class, it has blue background color, white and bold text, padding 2px on y direction, 4px on x direction, and corner rounded;

We can use this class directly in our HTML element.
```
@layer components {

    /* component sample define */
    .btn-blue {
        @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
    }
  }
```