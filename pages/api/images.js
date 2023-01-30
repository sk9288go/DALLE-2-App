export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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"
    // req.query.t,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    style: req.query.s,
    prompt: req.query.p + "," + req.query.s,
    n: parseInt(req.query.n),
    size : req.query.si, 
    // 이미지 사이즈 옵션 추가 216,512,620,max 지정 
    // 프롬프트 = 주어, 목적어 위주의 
    // 스타일 버튼, 예시가 될수있는 
    // ? 버튼 hover시 설명 추가 
  });
  console.log(response.data.data);

  res.status(200).json({ result: response.data.data })
  
}
