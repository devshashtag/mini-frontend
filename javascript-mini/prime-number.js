const N = 20;

reset: for (let i = 2; i < N; i++) {
  const numSqrt = Math.floor(Math.sqrt(i));

  for (let j = 2; j <= numSqrt; j++)
    if (i % j === 0) continue reset;

  console.log('prime: ', i);
}
