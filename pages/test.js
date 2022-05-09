  export async function getServerSideProps(context) {

    const myDbData = {test:"test"};
    return {props: {myDbData}}
  }
function Test() {
    return (
      <>
      Test Page
      </>
    );
  }
export default Test;