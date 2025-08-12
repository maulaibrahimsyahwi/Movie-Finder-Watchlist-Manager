// src/components/UI/ErrorMessage.js - Updated with Remix Icons
function ErrorMessage({ message }) {
  return (
    <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-xl">
      <div className="text-4xl mb-2 text-red-400 flex justify-center">
        <i className="ri-error-warning-line"></i>
      </div>
      <p className="text-red-400 font-medium">{message}</p>
    </div>
  );
}

export default ErrorMessage;
