export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    style: req.query.s,
    size : req.query.si,
    prompt: req.query.p + "," + req.query.s,
    n: parseInt(req.query.n),  
  });
  console.log(response.data.data);

  res.status(200).json({ result: response.data.data })
  
}
