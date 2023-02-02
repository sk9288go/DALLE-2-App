export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: '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'
    // req.query.t,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    style: req.query.s,
    prompt: req.query.p + "," + req.query.s,
    n: parseInt(req.query.n),
    size : req.query.si,    
  });
  console.log(response.data.data);

  res.status(200).json({ result: response.data.data })
  
}
