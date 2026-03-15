import React from 'react';

interface FormattedDateProps {
  date: Date;
}

export function formatDate(date: Date): string {
  const now = new Date();
  
  // Reset the time part of 'now' to midnight
  now.setHours(0, 0, 0, 0);
  
  // Calculate the difference in days
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  } else if (diffDays === 1) {
    return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  } else if (diffDays === -1) {
    return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  } else if (diffDays > 1 && diffDays < 7) {
    return date.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false });
  } else {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;