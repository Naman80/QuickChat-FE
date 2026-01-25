import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLocalStorageItem, LOCALSTORAGE } from "../../utils/localStorage";
import { useSessionContext } from "../../modules/session/SessionContext";

const OTP_LENGTH = 6;
const RESEND_INTERVAL = 60;

export const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const { requestOtp, verifyOtpAndStartSession } = useSessionContext();

  const phone = getLocalStorageItem(LOCALSTORAGE.USER_PHONE);

  // State
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_INTERVAL);

  const canResend = secondsLeft === 0;
  const isOtpValid = otp.length === OTP_LENGTH;

  // Countdown timer
  useEffect(() => {
    if (secondsLeft === 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  // Guard against missing phone
  useEffect(() => {
    if (!phone) {
      setError("Phone number not found. Please restart login.");
    }
  }, [phone]);

  const handleOtpChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!phone) return;

      if (!isOtpValid) {
        setError("Please enter a valid 6-digit OTP");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        await verifyOtpAndStartSession(phone, otp);
        navigate("/chat");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid OTP");
      } finally {
        setIsLoading(false);
      }
    },
    [otp, phone, verifyOtpAndStartSession, navigate, isOtpValid],
  );

  const handleResendOTP = useCallback(async () => {
    if (!phone || !canResend) return;

    try {
      setError(null);
      setSecondsLeft(RESEND_INTERVAL);
      await requestOtp(phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    }
  }, [phone, requestOtp, canResend]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">QuickChat</h1>

        <h2 className="text-lg font-semibold text-center mb-2">Verify OTP</h2>

        <p className="text-sm text-gray-500 text-center mb-8">
          We’ve sent a 6-digit OTP to {phone ?? "your phone"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={handleOtpChange}
              maxLength={OTP_LENGTH}
              placeholder="Enter 6-digit OTP"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-xl tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={!isOtpValid || isLoading || !phone}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center text-sm text-gray-500">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-blue-500 font-semibold hover:text-blue-600"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-blue-500 font-semibold">
                Resend in {secondsLeft}s
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
