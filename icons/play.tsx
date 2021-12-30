export default function Play({ solid = true }: { solid?: boolean }) {
  return (
    <>
      {solid ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -2 40 40">
          <path d="M35 17.5L0 35V0z" fill="currentColor" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-60 0 1000 1000"
          xmlSpace="preserve"
          fill="currentColor"
        >
          <g>
            <path d="M138.1,990c-5.3,0-10.7-1.3-15.5-4c-10.3-5.7-16.7-16.5-16.7-28.2V42.2c0-11.7,6.3-22.5,16.7-28.2c10.2-5.7,22.8-5.3,32.7,1l723.8,457.8c9.4,5.9,15,16.1,15,27.2c0,11-5.7,21.3-15,27.2L155.3,985C150,988.3,144,990,138.1,990z M170.2,100.6v798.9L801.7,500L170.2,100.6z" />
          </g>
        </svg>
      )}
    </>
  );
}
