import styled from 'styled-components';

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: var(--font-size-b1);
  color: var(--color-grey-s2);
`;

export default function ListItemIcon({ icon, children, ...props }) {
  return (
    <StyledListItem {...props}>
      {icon}
      {children}
    </StyledListItem>
  );
}
