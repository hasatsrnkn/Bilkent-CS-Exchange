async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body
    fetch("https://react-http-6b4a6.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default handler;
