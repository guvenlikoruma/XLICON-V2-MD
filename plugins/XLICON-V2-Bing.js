import fetch from 'node-fetch';

let handler = async (message, {
  conn: connection,
  args: arguments,
  usedPrefix: prefix,
  command: cmd,
  text: inputText
}) => {
  if (!inputText && !(message.quoted && message.quoted.text)) {
    throw "Yanıt almak için lütfen bir metin girin veya bir mesajdan alıntı yapın.";
  }
  if (!inputText && message.quoted && message.quoted.text) {
    inputText = message.quoted.text;
  }
  message.reply("𝓚𝓡𝓐𝓛 𝓕𝓐𝓢𝓗𝓘̇𝓞𝓝 Bot sunucusundan Yanıt Bekleniyor...");
  message.react('🤔');
  const encodedText = encodeURIComponent(inputText);
  let response = await Bing(encodedText);
  if (!response) {
    throw new Error("Bing'den geçerli bir JSON yanıtı yok ");
  }
  await connection.reply(message.chat, response, message);
};

handler.help = ["bing"];
handler.tags = ['AI'];
handler.command = /^(bing)$/i;
export default handler;

async function Bing(queryText) {
  let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
    'method': "POST",
    'headers': {
      'Authorization': "dummy",
      'Content-Type': "application/json"
    },
    'body': JSON.stringify({
      'model': "Creative",
      'max_tokens': 100,
      'messages': [{
        'role': "system",
        'content': "You are an helpful assistant."
      }, {
        'role': "user",
        'content': queryText
      }]
    })
  })).json();
  return response.choices[0].message.content;
}
