function add(a: number, b: number): number {
    return a + b;
}

test('add additionne correctement deux nombres', () => {
    // Arrange (Préparer les données)
    const a = 5;
    const b = 3;

    // Act (Agir sur le système sous test)
    const result = add(a, b);

    // Assert (Vérifier les résultats)
    expect(result).toBe(8); // Vérifie si le résultat est égal à 8
});
