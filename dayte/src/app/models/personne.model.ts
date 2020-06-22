
export class Personne {
    id_personne: number;
    nom: string;
    prenom: string;
    mail: string;
    // password: string;
    tel: string;
    age: number;
    taille: number;
    sexe: string;
    sexe_rechercher: string;
    id_ville: number;
    code_postale: number;
    available: boolean;
    accessToken: string;
    tokenType: string;
    expiresIn: number;

    constructor(id_personne: number, nom: string, prenom: string, mail: string, tel: string, age: number, taille: number, sexe: string, sexe_rechercher: string, id_ville: number, code_postale: number, available: boolean) {
        this.id_personne = id_personne;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.tel = tel;
        this.age = age;
        this.taille = taille;
        this.sexe = sexe;
        this.sexe_rechercher = sexe_rechercher;
        this.id_ville = id_ville;
        this.code_postale = code_postale;
        this.available = available;
    }

    static parse(personne: any) {
        return new Personne(personne.id_personne, personne.nom, personne.prenom, personne.mail, personne.tel, personne.age, personne.taille, personne.sexe, personne.sexe_rechercher, personne.id_ville, personne.code_postale, personne.available);
    }
}
