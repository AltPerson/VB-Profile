import { motion } from 'motion/react';
import { TechnologyIcon } from './skills-icons';
import { Skill, skillEase } from './skills-taxonomy';

export default function SkillTile({
  skill,
  index,
  reduced,
  categoryLabel,
  searching,
}: {
  skill: Skill;
  index: number;
  reduced: boolean;
  categoryLabel?: string;
  searching: boolean;
}) {
  return (
    <motion.li
      className="skills-matrix__tile"
      data-skill={skill.id}
      initial={reduced ? false : { opacity: 0, y: searching ? 0 : 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : searching ? 0.12 : 0.2,
        delay: reduced || searching ? 0 : Math.min(index, 10) * 0.025,
        ease: skillEase,
      }}
    >
      <span className="skills-matrix__tech-icon">
        <TechnologyIcon id={skill.id} categoryId={skill.categoryId} />
      </span>
      <span className="skills-matrix__tile-text">
        {skill.label}
        {categoryLabel && <small>{categoryLabel}</small>}
      </span>
    </motion.li>
  );
}
