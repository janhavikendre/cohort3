export function RequestAirdrop() {
    function requestAirdrop() {
        alert("hi there");
    }

    return <div>
        <input type="text" placeholder="Amount..." />
        <button onClick={requestAirdrop}>Request airdrop</button>
    </div>
}