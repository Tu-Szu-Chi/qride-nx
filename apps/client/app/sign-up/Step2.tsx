import React, { ReactEventHandler, useCallback, useRef, useState } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import Link from 'next/link';

const Step2 = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(Number(e.target.value))) return;

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Focus on next input
    if (e.target.nextSibling && e.target.value) {
      (e.target.nextSibling as HTMLInputElement).focus();
    }
  };
  const handleSubmit = () => {};

  return (
    <Container
      title="Verification"
      step={2}
      bottomEle={
        <div className="text-center">
          <Button onClick={handleSubmit} className="mb-10">
            Submit
          </Button>
          <p className="text-gray-600 mb-4">
            Didn&apos;t you receive any code?
          </p>
          <Link href="/sign-in">
            <span className="text-blue-600 border-b-2 border-blue-100">
              Resend New Code
            </span>
          </Link>
        </div>
      }
    >
      <div>
        <h4 className="w-full text-center mt-20 mb-14">Enter your OTP number</h4>
        <div className='flex justify-between items-center px-10'>
          {otp.map((data, index) => (
            <input
              className="flex items-center justify-center
              text-center
            w-12 h-12 rounded-sm
           bg-gray-300 text-white  font-bold text-xl"
              type="number"
              name="otp"
              maxLength={1}
              key={index}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Step2;
