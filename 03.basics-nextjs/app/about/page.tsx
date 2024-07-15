import Link from "next/link";
import React from "react";

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is About page</p>
      <Link href="/">Go Back Home</Link>
    </div>
  );
}

export default About;
