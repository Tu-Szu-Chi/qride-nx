import React, { useState } from 'react';
import Container from './Container';
import api from '$/utils/fetch';
import { OtpTypeEnum } from '@org/types/src';
import { usePayload } from './PayloadContext';
import { CODE_SUCCESS } from '@org/common/src';
import SubmitButton from '$/components/Button/SubmitButton';

type Props = {
  onSuccess: () => void;
};

const Step2 = (props: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [isLoading, setLoading] = useState<boolean>(false);
  const { phone, setToken } = usePayload();
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
    setLoading(true);
    api
      .post('/auth/otp/verify', {
        phone,
        code: otp.join(''),
        type: OtpTypeEnum.REGISTER,
      })
      .then((res) => {
        if (res.bizCode == CODE_SUCCESS) {
          setToken(res.data);
          props.onSuccess();
        } else {
          // show error message
        }
      })
      .catch((err) => {
        // show error message
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container title="Create an account" step={2}>
      <div>
        <h4 className="text-primary text-xl mt-20">Enter OTP</h4>
        <div className="flex justify-between items-center mt-6">
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
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl text-white">Next</span>
        <SubmitButton isLoading={isLoading} onClick={handleSubmit} />
      </div>
    </Container>
  );
};

export default Step2;
