const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The submit Goal button has text "ثبت هدف". Let's verify it works in verify script.
// It seems playwright click may be unreliable with the transparent overlay, let's use page evaluate click in playwright script.
