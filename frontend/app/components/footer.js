import Link from "next/link";

export default function Footer() {
  return (
    <section className="w-full h-64 flex items-center bg-[#ffffff] text-gray-900 border border-t-2">
      <section className="w-full flex flex-col items-center">
        <ul className="w-full md:w-1/2 lg:w-1/4 h-16 flex justify-evenly items-center mb-8">
          <li>
            <a href="https://instagram.com/postable/" target="_blank">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 37 37"
                enableBackground="new 0 0 37 37"
                xmlSpace="preserve"
                className="w-14 lg:w-10 h-14 lg:h-10"
              >
                <g>
                  <path
                    fill="#1C2C5B"
                    d="M18.5,3.3c4.9,0,5.5,0,7.5,0.1c1.8,0.1,2.8,0.4,3.4,0.6c0.9,0.3,1.5,0.7,2.1,1.4c0.6,0.6,1,1.3,1.4,2.1
		c0.3,0.7,0.6,1.6,0.6,3.4c0.1,2,0.1,2.5,0.1,7.5s0,5.5-0.1,7.5c-0.1,1.8-0.4,2.8-0.6,3.4c-0.3,0.9-0.7,1.5-1.4,2.1
		c-0.6,0.6-1.3,1-2.1,1.4c-0.7,0.3-1.6,0.6-3.4,0.6c-2,0.1-2.5,0.1-7.5,0.1s-5.5,0-7.5-0.1c-1.8-0.1-2.8-0.4-3.4-0.6
		c-0.9-0.3-1.5-0.7-2.1-1.4c-0.6-0.6-1-1.3-1.4-2.1c-0.3-0.7-0.6-1.6-0.6-3.4c-0.1-2-0.1-2.5-0.1-7.5s0-5.5,0.1-7.5
		c0.1-1.8,0.4-2.8,0.6-3.4C4.4,6.6,4.8,6,5.5,5.4c0.6-0.6,1.3-1,2.1-1.4C8.2,3.8,9.2,3.5,11,3.4C13,3.4,13.6,3.3,18.5,3.3 M18.5,0
		c-5,0-5.7,0-7.6,0.1C8.9,0.2,7.6,0.5,6.4,1C5.2,1.4,4.1,2.1,3.1,3.1S1.4,5.2,1,6.4c-0.5,1.2-0.8,2.5-0.9,4.5S0,13.5,0,18.5
		s0,5.7,0.1,7.6c0.1,2,0.4,3.3,0.9,4.5s1.1,2.2,2.1,3.3c1,1,2.1,1.7,3.3,2.1c1.2,0.5,2.5,0.8,4.5,0.9c2,0.1,2.6,0.1,7.6,0.1
		s5.7,0,7.6-0.1c2-0.1,3.3-0.4,4.5-0.9s2.2-1.1,3.3-2.1c1-1,1.7-2.1,2.1-3.3c0.5-1.2,0.8-2.5,0.9-4.5c0.1-2,0.1-2.6,0.1-7.6
		s0-5.7-0.1-7.6c-0.1-2-0.4-3.3-0.9-4.5s-1.1-2.2-2.1-3.3c-1-1-2.1-1.7-3.3-2.1c-1.2-0.5-2.5-0.8-4.5-0.9C24.2,0,23.5,0,18.5,0
		L18.5,0z"
                  ></path>
                  <path
                    fill="#1C2C5B"
                    d="M18.5,9C13.3,9,9,13.3,9,18.5s4.3,9.5,9.5,9.5s9.5-4.3,9.5-9.5S23.8,9,18.5,9z M18.5,24.7
		c-3.4,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2S21.9,24.7,18.5,24.7z"
                  ></path>
                  <circle fill="#1C2C5B" cx="28.4" cy="8.6" r="2.2"></circle>
                </g>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/postable" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 37 37"
                fill="#1C2C5B"
                className="w-14 lg:w-10 h-14 lg:h-10"
              >
                <path d="M18.5 0C8.3 0 0 8.3 0 18.5c0 7.6 4.6 14.1 11 16.9-.1-1.3 0-2.9.3-4.3.4-1.5 2.4-10 2.4-10s-.6-1.2-.6-2.9c0-2.8 1.6-4.8 3.6-4.8 1.7 0 2.5 1.3 2.5 2.8 0 1.7-1.1 4.2-1.6 6.6-.5 2 1 3.6 2.9 3.6 3.5 0 5.9-4.5 5.9-9.8 0-4.1-2.7-7.1-7.7-7.1-5.6 0-9.2 4.2-9.2 8.9 0 1.6.5 2.8 1.2 3.6.3.4.4.6.3 1-.1.3-.3 1.2-.4 1.5-.1.5-.5.6-.9.5C7.2 23.8 6 21 6 17.8c0-5.3 4.5-11.5 13.2-11.5 7.1 0 11.7 5.1 11.7 10.6 0 7.3-4.1 12.6-9.9 12.6-2 0-3.9-1.1-4.5-2.3 0 0-1.1 4.3-1.3 5.1-.4 1.4-1.2 2.9-1.9 4 1.7.5 3.4.8 5.3.8 10.2 0 18.5-8.3 18.5-18.5C37 8.3 28.7 0 18.5 0z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/stiltoc" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 37 37"
                fill="#1C2C5B"
                className="w-14 lg:w-10 h-14 lg:h-10"
              >
                <path d="M34.7 4.5c-1.3.7-2.7 1.2-4.3 1.5-1.4-1.5-3.3-2.4-5.5-2.4-4.8 0-8.4 4.5-7.3 9.2-5.6-.2-10.7-2.7-14.3-6.5-.6-.6-1.6-.4-1.8.4-.9 3 .2 6.5 3 8.3-.6 0-1.3-.1-1.8-.3-.8-.2-1.5.5-1.3 1.2.7 2.7 2.9 5 5.8 5.6-.5.1-1.1.2-1.7.3-.8 0-1.3.9-.9 1.6 1.3 2 3.6 3.4 6.2 3.5-2.1 1.6-4.4 2.6-7 3-1.1.2-1.2 1.7-.2 2.1 2.3.9 4.9 1.4 7.6 1.4 13.9 0 21.8-11.8 21.3-22.3 1.3-.9 2.4-2 3.3-3.3.1-.2-.1-.4-.3-.3-1.1.4-2.4.7-3.6.9 1.4-.8 2.5-2.1 3.1-3.6.1-.2-.1-.4-.3-.3z"></path>
              </svg>
            </a>
          </li>
        </ul>

        <ul className="w-full lg:w-1/2 flex justify-evenly">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/">Terms & Conditions</Link>
          </li>
          <li>
            <Link href="/">Privacy Policy</Link>
          </li>
        </ul>
      </section>
    </section>
  );
}
