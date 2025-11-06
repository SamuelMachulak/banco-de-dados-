# 📋 Tabela de Amigos

Um site simples que exibe uma tabela com os nomes **Marco**, **Luiz**, **Samuel** e **Sthevan**, junto de comandos SQL básicos.

## 🧱 Tecnologias
- HTML
- CSS
- SQL (comandos: INSERT, SELECT, DELETE, ALTER e DROP)

## 💾 SQL incluído
```sql
CREATE TABLE amigos (nome TEXT);
INSERT INTO amigos VALUES ('Marco'), ('Luiz'), ('Samuel'), ('Sthevan');
SELECT * FROM amigos;
DELETE FROM amigos WHERE nome='Luiz';
ALTER TABLE amigos ADD COLUMN id INT;
DROP TABLE amigos;
