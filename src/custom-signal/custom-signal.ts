// This is a custom js implementantion of Signals API
// It does not require Angular runtime to run
// 
// "npm run custom-singal"

let current;

function createSignal(initialValue) {
  let value = initialValue;

  // Add reactivity through subs
  const subscribers = [];

  function set(newValue) {
    value = newValue

    // Call subsribers when the value is set
    subscribers.forEach(sub => {
      sub()
    });
  }

  function read() {
    subscribers.push(current);
    return value;
  }

  return [ read, set ]
}

// Whenever we "read" the signal we need to add the subscriber reading the signal.
// 
// We can do that by passing a subscriber into the read function i.e. read(sub) or 
// create an effect function that handles a global variable (current) to help track
// the subscribers
function effect(fn) {
  current = fn;

  fn();

  current = null;
}

// Call the signal

const [ count, setCount ] = createSignal(10)

effect(() => {
  console.log('------ count is --------- ', count())
})

setCount(100)