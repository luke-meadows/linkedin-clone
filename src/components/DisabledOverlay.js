export default function DisabledOverlay() {
  const styles = {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 10,
    top: '76px',
  };
  return <div style={styles} />;
}
