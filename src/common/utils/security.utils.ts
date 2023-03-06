import * as bcrypt from 'bcrypt';

export class Security {
  static hashBcrypt = async (text = '', salt = 10) => {
    // generate salt to hash password
    const saltHash = await bcrypt.genSalt(salt);
    // now we set user password to hashed password
    return await bcrypt.hash(text, saltHash);
  };

  static compareBcrypt = async (plaintext, hash): Promise<boolean> => {
    return await bcrypt.compare(plaintext, hash);
  };
}
