# **Question 1:** In the context of JavaScript and React library, what is a Functional Component? How can it be defined? Also, explain the Props and Hook concept and elaborate your answers with a fully functional sample code.

In JavaScript, a function is a reusable block of code that performs a specific task. In React, a component is essentially the same thing but with some key differences. While they may be initialized in a very similar manner, React components are independent pieces of the applications UI and the component contains both HTML and Javascript. In a typical function a value is returned, however with React you return HTML code to render out the UI. Everything before the return statement is JavaScript that functions the same way it always does. The HTML elements in the return block can also take props to dynamically render out bits of data in the UI. Props are essentially arguments for the component and are passed in the same way. Props are a way to pass data from a parent component down to a child component. Hooks are special functions that need to be imported from the react library. They can only be called within components and at the top of the component, they must not be conditional as well. Hooks are tools for React that let us use more React features, for example, useEffect(). This hook lets us define code that will run when a certain value is changed in the code (defined in its dependency array). An example of this would be for a timer component counting down, I would set the dependency array to run the code whenever the time goes down (if it is running). Each time the value of the time changes the code runs. By doing this the timer updates dynamically and something like a for loop woulnt have to be used. 
```
    useEffect(() => {
        var interval = null;

        if(isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            alarm();
            clearInterval(interval);
            reset();
        } else if (!isRunning && timeLeft !== null) {
        clearInterval(interval);
        } 

        return () => clearInterval(interval);

    }, [isRunning, timeLeft, isVisible])

```
