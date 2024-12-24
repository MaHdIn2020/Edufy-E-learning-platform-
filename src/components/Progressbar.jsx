/* eslint-disable react/prop-types */

function Progressbar({ progress }) {
  const completedModules = progress?.completedModules || 0;
  const percentage = (completedModules / 5) * 100;

  return (
    <div
      className="radial-progress text-primary"
      style={{ "--value": percentage }}
      role="progressbar"
    >
      {percentage}%
    </div>
  );
}

export default Progressbar;
