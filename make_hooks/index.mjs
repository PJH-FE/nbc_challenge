import MyReact from "./React.mjs";
import { useState, useEffect } from "./React.mjs";

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("foo");

  useEffect(() => {
    console.log("Effect function is called.");

    return () => {
      console.log("Cleanup function is called.");
    };
  }, [count]);

  return {
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () => setCount(count),
    render: () => console.log("render", { count, text }),
  };
}

let App = MyReact.render(ExampleComponent);
// Effect function is called.
// render { count: 0, text: 'foo' }

App.click();
App = MyReact.render(ExampleComponent);
// render { count: 1, text: 'foo' }
// Cleanup function is called.
// Effect function is called.

App.type("bar");
App = MyReact.render(ExampleComponent);
// render { count: 1, text: 'bar' }
