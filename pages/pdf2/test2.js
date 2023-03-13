import { useState } from 'react';
import pdf from 'html-to-pdf';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);

    const options = { format: 'Letter' };
    const html = `
      <html>
        <body>
          <h1>My PDF</h1>
          <p>Hello, world!</p>
        </body>
      </html>
    `;

    pdf.create(html, options).toFile('mypdf.pdf', (err, res) => {
      if (err) return console.log(err);

      const filePath = `${process.cwd()}/mypdf.pdf`;
      const file = fs.createReadStream(filePath);

      file.on('open', () => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mypdf.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        setIsLoading(false);
      });

      file.on('error', (err) => {
        console.log(err);
        setIsLoading(false);
      });
    });
  };

  return (
    <div>
      <button disabled={isLoading} onClick={handleDownload}>
        {isLoading ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
};

export default MyComponent;
