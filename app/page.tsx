import Container from "@/components/container";
import Link from "next/link";

export default function Home() {
  return (
    <div className="MainPage">
      <div className="main">
        <h3 className="title">Quizzy!</h3>
        <p>
          Improve your general knowledge in this fun and interactive trivia
          game!
        </p>
        <a className="nav-button text-center" href="/quizzes">
          Get Started
        </a>
      </div>
    </div>
  );
}
