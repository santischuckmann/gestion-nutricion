export const DietaryPlans = () => {
  const dietaryPlans = [ { name: 'santiago', surname: 'schuckmann ' } ]
  return (
    <div>
      {dietaryPlans.map(({ name, surname }) => (
        <div key={name}>
          {name} - {surname}
        </div>
      ))}
    </div>
  )
}