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
    <div className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-6 py-10 rounded-lg shadow-lg text-gray-300">
        <section className="mb-10">
          <p className="text-xl">
            <strong className="text-2xl">Quanta</strong> is a decentralized Ethereum-based lending
            and borrowing platform. It allows users to lend and borrow four
            supported crypto tokens:{" "}
            <strong className="text-customGreen">REACT</strong>,{" "}
            <strong className="text-customGreen">NODE</strong>,{" "}
            <strong className="text-customGreen">VUE</strong>, and{" "}
            <strong className="text-customGreen">NEXT</strong>.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            Lenders earn a fixed annual yield of{" "}
            <span className="font-bold">5%</span> on their deposits, while
            borrowers can access liquidity by providing collateral in any of the
            three other supported tokens. Borrowers pay a simple interest rate
            based on a fixed base interest rate of{" "}
            <span className="font-bold">2%</span>, adjusted dynamically by the
            platform's utilization rate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <ul className="list-disc list-inside text-xl space-y-4">
            <li>
              <strong>Lenders:</strong> Earn 5% annual yield on their deposits
              in one of the supported tokens.
            </li>
            <li>
              <strong>Borrowers:</strong> Can borrow tokens by providing
              collateral worth <strong>150%</strong> of the borrowed amount.
            </li>
            <li>
              <strong>Interest for Borrowers:</strong> Interest is calculated as
              a <strong className="font-bold">2%</strong> base interest plus an
              additional rate based on the platform’s utilization.
            </li>
          </ul>
        </section>

      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Advantages of Quanta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="rounded-lg p-6 shadow-lg bg-customBlack"
            >
              <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
              <p className="text-lg text-gray-400">{advantage.description}</p>
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
