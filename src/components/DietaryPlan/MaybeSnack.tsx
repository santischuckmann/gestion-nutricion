export const MaybeSnack = ({
  snack
}: { snack: string | null}) => {
  if (snack === null)
    return null

  return (
    <span>{snack}</span>
  )
}