export const generateMeetingLink = (appointmentId) => {
  const roomCode = `mediconnect-${appointmentId.toString().slice(-8)}`;
  return `https://meet.jit.si/${roomCode}`;
};
