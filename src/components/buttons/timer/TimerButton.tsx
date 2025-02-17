import { FC } from 'react';
import { RiPlayFill, RiPauseFill, RiRefreshFill } from 'react-icons/ri';

interface TimerButtonProps {
  onClick: () => void;
  icon: 'start' | 'stop' | 'reset';
  disabled: boolean;
}

const TimerButton: FC<TimerButtonProps> = ({ onClick, icon, disabled }) => {
  const getIcon = () => {
    switch (icon) {
      case 'start':
        return <RiPlayFill className="text-lg" />;
      case 'stop':
        return <RiPauseFill className="text-lg" />;
      case 'reset':
        return <RiRefreshFill className="text-lg" />;
      default:
        return null;
    }
  };

  const getButtonStyles = () => {
    switch (icon) {
      case 'start':
        return 'bg-green-500 hover:bg-green-400 disabled:bg-gray-400';
      case 'stop':
        return 'bg-red-500 hover:bg-red-400 disabled:bg-gray-400';
      case 'reset':
        return 'bg-blue-500 hover:bg-blue-400';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white p-2 rounded-full transition-colors ${getButtonStyles()}`}
    >
      {getIcon()}
    </button>
  );
};

export default TimerButton;