import { useState } from "react";

export default function Textarea() {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    // console.log(e.target.value);
    let newText = e.target.value;
    // 设置之前需要检验内容，防止输入脚本等不安全内容
    if (newText.includes("<script>")) {
      alert("请不要输入脚本内容");
      newText = newText.replace("<script>", "");
    }

    setText(newText);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      className="textarea"
      placeholder="请输入文本内容"
      spellCheck="false"
    />
  );
}
