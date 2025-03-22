interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * ErrorMessage component displays an error message with an optional retry button.
 *
 * It provides a user-friendly way to show error messages and allows users to
 * retry the failed operation if an `onRetry` function is provided.
 *
 * @param message - The error message to display.
 * @param onRetry - An optional function to call when the retry button is clicked.
 * @returns JSX.Element
 */

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-4 transition-colors duration-200"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

/**
 * Usage example:
 *
 * import ErrorMessage from './ErrorMessage';
 *
 * function MyComponent() {
 * const handleRetry = () => {
 * console.log('Retrying...');
 * };
 *
 * return (
 * <div>
 * <ErrorMessage message="Failed to fetch data." onRetry={handleRetry} />
 * </div>
 * );
 * }
 */
