import { useEffect, useRef, useState } from "react";

function OTP({otp, setOtp}) {
  const OTP_LENGTH = 6;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [inputIndex, setInputIndex] = useState(0);
   const inputRefs = useRef([]);
  const FocusHandler = (e, index) => {
     const value = e.target.value;
    if (!value) return;
   
    if(otp[index] !== '' && index < OTP_LENGTH - 1 ){
      inputRefs.current[index + 1].disabled = false;
      inputRefs.current[index + 1].focus();
      const newOTP = [...otp];
      newOTP[index +1] = value[1];
      setOtp(newOTP);
      return;
    
    }
    const newOTP = [...otp];
    newOTP[index] = value[0];
    setOtp(newOTP);
     if (index < OTP_LENGTH - 1 ) {
      setInputIndex(index +1)
      inputRefs.current[index + 1].disabled = false;
      inputRefs.current[index + 1].focus();
     }
  };
useEffect(() => {
    inputRefs.current[inputIndex]?.focus();
  }, [inputIndex]);
  const handleKeyDown = (e, index) => {
     if (e.key !== "Backspace") {
      return;
    }
 
    if (otp[index] !== '' && e.key === "Backspace") {
       const newOTP = [...otp];
    newOTP[index] = '';
    setOtp(newOTP);
    setInputIndex(index)
      return;
    }  if(otp[index] === '' && e.key === "Backspace" && index >0){
      setInputIndex(index-1)
      inputRefs.current[index - 1]?.focus()
      inputRefs.current[index -1].disabled = false;

    }
  
  };

  const getPastedValues = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0,OTP_LENGTH);
    
    setOtp([...pasted])

    inputRefs.current[OTP_LENGTH - 1].disabled = false;
    setInputIndex(OTP_LENGTH - 1)
       };

  return (
    <>
      <div className="space-x-2.5 flex" onPaste={getPastedValues}>
        {otp.map((_, i) => {
          return (
            <input
           className="border border-gray-200 rounded-md bg-gray-100 
             focus:border-[#2b59d9] focus:outline-none 
             h-10 w-full px-1 text-center"
              key={i}
              type="text"
              inputMode="numeric"
              ref={(el) => (inputRefs.current[i] = el)}
              value={otp[i]}
              autoFocus={i === 0}
              disabled={inputIndex === i ? false :true}
              onChange={(e) => FocusHandler(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          );
        })}
      </div>
    </>
  );
}

export default OTP;
