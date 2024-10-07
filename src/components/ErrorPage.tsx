function ErrorPage({ text }: { text: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-red-500">{text}</p>
    </div>
  );
}

export default ErrorPage;
