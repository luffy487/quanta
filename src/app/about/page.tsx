"use client";

const About = () => {
  const advantages = [
    {
      title: "Decentralized Platform",
      description:
        "Quanta is built on Ethereum, ensuring a fully decentralized lending and borrowing experience without intermediaries.",
    },
    {
      title: "Fixed Lender Yield",
      description:
        "Lenders enjoy a fixed 5% annual yield on their deposits, providing predictable and reliable returns.",
    },
    {
      title: "Dynamic Borrower Interest",
      description:
        "Borrower interest rates are adjusted based on the platform’s utilization, offering competitive rates depending on demand.",
    },
    {
      title: "Secure Collateralization",
      description:
        "Borrowers can secure loans by providing collateral worth 150% of the borrowed amount, ensuring a safe and reliable system.",
    },
    {
      title: "Four Supported Tokens",
      description:
        "The platform supports four tokens: REACT, NODE, VUE, and NEXT, allowing flexibility in lending and borrowing.",
    },
  ];

  return (
    <div className="container mx-auto px-[250px] py-4">
      <div className="container mx-auto rounded-lg shadow-lg text-gray-400">
        <section className="mb-10">
          <p className="text-[16px]">
            <span className="text-[18px] text-white">Quanta</span> is a decentralized Ethereum-based lending
            and borrowing platform. It allows users to lend and borrow four
            supported crypto tokens:{" "}
            <span className="text-white">REACT</span>,{" "}
            <span className="text-white">NODE</span>,{" "}
            <span className="text-white">VUE</span>, and{" "}
            <span className="text-white">NEXT</span>.
          </p>
          <p className="text-[16px] leading-relaxed mt-6">
            Lenders earn a fixed annual yield of{" "}
            <span className="text-white">5%</span> on their deposits, while
            borrowers can access liquidity by providing collateral in any of the
            three other supported tokens. Borrowers pay a simple interest rate
            based on a fixed base interest rate of{" "}
            <span className="text-white">2%</span>, adjusted dynamically by the
            platform&apos;s utilization rate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-[20px] mb-4 text-white">How It Works</h2>
          <ul className="list-disc list-inside text-[16px] space-y-4">
            <li>
              <span className="text-white">Lenders:</span> Earn 5% annual yield on their deposits
              in one of the supported tokens.
            </li>
            <li>
              <span className="text-white">Borrowers:</span> Can borrow tokens by providing
              collateral worth <span>150%</span> of the borrowed amount.
            </li>
            <li>
              <span className="text-white">Interest for Borrowers:</span> Interest is calculated as
              a <span className="font-bold">2%</span> base interest plus an
              additional rate based on the platform’s utilization.
            </li>
          </ul>
        </section>

      </div>

      <section className="mb-8">
        <h2 className="text-[20px] mb-6 text-white">
          Advantages of Quanta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="rounded-lg p-6 shadow-lg bg-customBlack"
            >
              <h3 className="text-[18px]  mb-4">{advantage.title}</h3>
              <p className="text-[16px] text-gray-400">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="text-center mt-12">
        <p className="text-sm text-gray-500">
          &copy; 2024 Quanta. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
