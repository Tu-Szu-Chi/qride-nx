import Title from '../../components/Title';
import StepIndicator from "./StepIndicator"

type Props = {
  title: string;
  step: number;
  bottomEle: React.ReactNode,
  children?: React.ReactNode
};

const Container = ({ title, step, bottomEle, children }: Props) => {
  return (
    <div className="w-full py-16 px-12 flex flex-col h-full flex-1 ">
      <Title className='mb-12 text-left w-32 font-bold text-primary'>{title}</Title>
      <StepIndicator steps={[1,2,3]} currentStep={step} />
      {children}
      <div className="mt-auto">{bottomEle}</div>
    </div>
  );
};

export default Container;
