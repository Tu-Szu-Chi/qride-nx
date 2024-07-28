import React, { useState } from 'react';
import Container from './Container';
import api from '$/utils/fetch';
import { OtpTypeEnum, VerifyOtpDto } from '@org/types/src';
import { usePayload } from './PayloadContext';
import { CODE_SUCCESS } from '@org/common/src';

type Props = {
  onSuccess: () => void
}

const Step2 = (props: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const { phone, setToken } = usePayload()
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
  const handleSubmit = () => {
    const payload: VerifyOtpDto = {
      phone: phone || 'None',
      code: otp.join(''),
      type: OtpTypeEnum.RESET_PASSWORD
    }
    api.post('/auth/otp/verify', payload)
      .then(res => {
        if (res.bizCode == CODE_SUCCESS) {
          setToken(res.data)
          props.onSuccess()
        } else {
          // ! alert
        }
      })
  };

  return (
    <Container
      title="OTP Verification"
      bottomEle={
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl text-white">Next</span>
          <div onClick={handleSubmit} className="rounded-full bg-white p-2">
            <img
              src="assets/arrow_right.svg"
              alt="submit"
              className="w-8 h-8"
            />
          </div>
        </div>
      }
    >
      <div className='mt-auto'>
        <h4 className="text-primary text-sm mb-6 text-center">
          Please enter the 4-digit OTP (One-Time Password) sent to your
          registered mobile number.
        </h4>
        <div className="flex justify-between items-center">
          {otp.map((data, index) => (
            <input
              className="flex items-center justify-center
              text-center
            w-14 h-14 rounded-xl
           bg-white border-white border-2 font-bold text-xl"
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
        <h4 className="text-center text-gray-500 mt-6">
          Didn&apos;t receive code?
          <br />
          Resend in 60s
        </h4>
      </div>
    </Container>
  );
};

export default Step2;
