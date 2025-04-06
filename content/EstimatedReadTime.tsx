type EstimatedReadTimeProps = {
    text: string;
  };
  
  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  };
  
  const EstimatedReadTime = ({ text }: EstimatedReadTimeProps) => {
    if (!text || !text.trim()) return null;
  
    const readTime = calculateReadTime(text);
    return (
      <div className="tldr-read-time">
        ⏱️ {readTime}
      </div>
    );
  };
  
  export default EstimatedReadTime;
  